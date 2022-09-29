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

export function API() {
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
          <TextContainer spacing="loose">
            <p>Hello world</p>
          </TextContainer>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
