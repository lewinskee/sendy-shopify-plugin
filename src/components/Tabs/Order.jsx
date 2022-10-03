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

export function Order() {
  const [textFieldValue, setTextFieldValue] = useState();

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Place Order On Fulfillment</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When checked, a fulfillment order will be placed once a customer places an order on your e-commerce site"
                checked={checked}
                onChange={handleChange}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Include Tracking Link & Status</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When checked tracking link and status will be added to the order received page"
                checked={checked}
                onChange={handleChange}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Include Collect Amount</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When checked the rider will receive a note indicating the amount to collect from the customer"
                checked={checked}
                onChange={handleChange}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Pick Up Address</p>
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
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Additional Delivery Info (optional)</p>
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
