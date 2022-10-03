import {
  Card,
  Page,
  Layout,
  Banner,
  TextField,
  Grid,
  Select,
  Stack,
  Button,
  Checkbox,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

export function Inventory() {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const [textFieldValue, setTextFieldValue] = useState();

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  const [selected, setSelected] = useState();

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const currencyOptions = [{ label: "KES", value: "kes" }];
  const quantityTypeOptions = [
    { label: "KILOGRAM", value: "kg" },
    { label: "GRAM", value: "g" },
    { label: "LITRE", value: "l" },
    { label: "MILLILITRE", value: "ml" },
  ];
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Required fields" status="info" onDismiss={() => {}}>
            <p>
              During delivery and pickup, Sendy Fulfilment needs to know the
              product weight or capacity for delivery consolidation purposes. We
              also need to know the price of each product for insurance
              purposes.
            </p>
          </Banner>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Sync Products On Change</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When this is checked your inventory will synch automatically when you update your products"
                checked={checked}
                onChange={handleChange}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Default Currency</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <Select
                options={currencyOptions}
                onChange={handleSelectChange}
                value={selected}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Default Quantity Type</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <Select
                options={quantityTypeOptions}
                onChange={handleSelectChange}
                value={selected}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Default Quantity</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <TextField
                label=""
                labelHidden
                value={textFieldValue}
                onChange={handleTextFieldChange}
                autoComplete="off"
                align="left"
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Button primary>Save</Button>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
