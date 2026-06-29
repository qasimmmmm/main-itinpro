import { describe, it, expect } from "vitest";
import { computeOrder, addOnsFor, baseFor } from "./checkout";
import { pricing } from "./content";
import { STATE_FEES } from "./states";

describe("baseFor", () => {
  it("prices each service from the pricing source of truth", () => {
    expect(baseFor("itin").amount).toBe(pricing.itin.price);
    expect(baseFor("llc").amount).toBe(pricing.llc.price);
    expect(baseFor("bundle").amount).toBe(pricing.bundle.price);
  });

  it("only LLC and bundle carry a state fee", () => {
    expect(baseFor("itin").hasStateFee).toBe(false);
    expect(baseFor("llc").hasStateFee).toBe(true);
    expect(baseFor("bundle").hasStateFee).toBe(true);
  });
});

describe("computeOrder", () => {
  it("charges the ITIN price with no state fee", () => {
    const order = computeOrder({ serviceSlug: "itin" });
    expect(order.serviceResolved).toBe(true);
    expect(order.total).toBe(pricing.itin.price);
    expect(order.hasStateFee).toBe(false);
    expect(order.stateApplied).toBe(true); // N/A services count as applied
  });

  it("adds the correct state filing fee for an LLC", () => {
    const order = computeOrder({ serviceSlug: "llc", stateName: "Texas" });
    const texas = STATE_FEES.find((s) => s.name === "Texas")!;
    expect(order.total).toBe(pricing.llc.price + texas.fee);
    expect(order.stateApplied).toBe(true);
  });

  it("treats a $0-fee state as a resolved state, not a missing one", () => {
    const order = computeOrder({ serviceSlug: "llc", stateName: "New Mexico" });
    expect(order.total).toBe(pricing.llc.price);
    expect(order.stateApplied).toBe(true);
  });

  it("flags an unresolved state for a service that requires one", () => {
    const order = computeOrder({ serviceSlug: "llc", stateName: "Not A Real State" });
    expect(order.hasStateFee).toBe(true);
    expect(order.stateApplied).toBe(false);
    expect(order.total).toBe(pricing.llc.price); // fee silently dropped — route must reject this
  });

  it("flags an unresolved state when none is supplied for an LLC", () => {
    const order = computeOrder({ serviceSlug: "llc" });
    expect(order.stateApplied).toBe(false);
  });

  it("marks an unknown/empty slug as unresolved (route must 400, not charge bundle)", () => {
    expect(computeOrder({ serviceSlug: "" }).serviceResolved).toBe(false);
    expect(computeOrder({ serviceSlug: "garbage" }).serviceResolved).toBe(false);
  });

  it("only applies add-ons valid for the chosen service", () => {
    // "add-itin" applies to llc only; an itin order must ignore it.
    const itinOrder = computeOrder({ serviceSlug: "itin", addOnIds: ["add-itin"] });
    expect(itinOrder.lines.some((l) => l.id === "addon:add-itin")).toBe(false);

    const llcAddOns = addOnsFor("llc").map((a) => a.id);
    expect(llcAddOns).toContain("add-itin");
  });

  it("sums base + state + add-ons exactly", () => {
    const order = computeOrder({
      serviceSlug: "llc",
      stateName: "Wyoming",
      addOnIds: ["expedited"],
    });
    const wyoming = STATE_FEES.find((s) => s.name === "Wyoming")!;
    const expedited = addOnsFor("llc").find((a) => a.id === "expedited")!;
    expect(order.total).toBe(pricing.llc.price + wyoming.fee + expedited.price);
  });

  it("ignores unknown add-on ids", () => {
    const order = computeOrder({ serviceSlug: "itin", addOnIds: ["does-not-exist"] });
    expect(order.total).toBe(pricing.itin.price);
  });
});
