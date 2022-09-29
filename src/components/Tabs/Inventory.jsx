import {
  Card,
  Page,
  Layout,
  TextContainer,
  Banner,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";

export function Inventory() {
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
          <TextContainer spacing="loose">
            <p>Hello world</p>
          </TextContainer>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
