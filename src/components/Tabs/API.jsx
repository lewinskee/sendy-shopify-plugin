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
} from "@shopify/polaris";
import { useState, useCallback } from "react";

export function API() {
  const [textFieldValue, setTextFieldValue] = useState();

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  const [selected, setSelected] = useState();

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Test", value: "test" },
    { label: "Live", value: "live" },
  ];
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Configurations" status="info" onDismiss={() => {}}>
            <p>
              These configurations enable us to uniquely identify and
              authenticate the requests made from your woocommerce store. To get
              the API key and API username for your business, send an email
              request to merchantapi@sendyit.com. You can test the plugin
              without an API-key but don’t forget to configure your API key and
              switch to production once testing is done. You can use any
              business name but we advise you to use the same name as on the
              Sendy Fulfilment app to avoid confusion.
            </p>
          </Banner>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Business Name</p>
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
              <p>Business Email</p>
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
              <p>API Username</p>
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
              <p>Environment</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <Select
                options={options}
                onChange={handleSelectChange}
                value={selected}
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
