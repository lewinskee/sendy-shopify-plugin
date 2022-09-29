import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Tabs,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

import { API } from "./Tabs/API";
import { FAQS } from "./Tabs/FAQS";
import { Inventory } from "./Tabs/Inventory";
import { Order } from "./Tabs/Order";

export function HomePage() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "API",
      content: "API settings",
      tab: <API />,
    },
    {
      id: "Inventory",
      content: "Inventory settings",
      tab: <Inventory />,
    },
    {
      id: "Order",
      content: "Order settings",
      tab: <Order />,
    },
    {
      id: "FAQS",
      content: "FAQS",
      tab: <FAQS />,
    },
  ];
  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          {tabs[selected].tab}
        </Card.Section>
      </Tabs>
    </Card>
  );
}
