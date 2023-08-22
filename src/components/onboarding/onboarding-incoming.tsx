import * as Components from "@/components";
import { PurchaseModel } from "@/types";

const testPurchases: PurchaseModel[] = [
  {
    id: 1,
    placement: 1,
    category: "monthly",
    description: "Anniversary Gift",
    cost: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 2,
    placement: 2,
    category: "monthly",
    description: "Pay Billy back for lunch",
    cost: 11.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 3,
    placement: 3,
    category: "monthly",
    description: "",
    cost: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
];

export const OnboardingIncoming = () => {
  return (
    <>
      <p>
        Are you aware of any incoming purchases that will eventually come down
        your way but are not sure when you have to pay for them? Or do you have
        any payments in general that you want to jot down for later? If so,
        enter them all below.
      </p>

      <Components.OverviewPurchasesDropdown
        title="Incoming Purchases"
        purchases={testPurchases}
        startOpened
      />
    </>
  );
};
