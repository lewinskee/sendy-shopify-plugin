import {
  Card,
  Page,
  Layout,
  TextContainer,
  DisplayText,
  TextStyle,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";

export function FAQS() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <DisplayText size="small">My products are not synching</DisplayText>
          <DisplayText size="">
            - Ensure that you fill in the price & name of a product when adding
            or editing it. These are required field for the api api key
          </DisplayText>
          <DisplayText size="">
            - You can also check the products table in the woocomerce tab, if
            the products are not synching. It will show you the products that
            synched and ones that did not
          </DisplayText>
        </Layout.Section>
        <Layout.Section>
          <DisplayText size="small">
            How to define how much the rider will collect from your customer
          </DisplayText>
          <DisplayText size="">
            - If this setting{" "}
            <TextStyle variation="strong">Include Collect Amount</TextStyle> is
            set in the <TextStyle variation="strong">Orders</TextStyle> tab, we
            will include a message to the rider to collect payment from the
            customer
          </DisplayText>
        </Layout.Section>
        <Layout.Section>
          <DisplayText size="small">Supported Currencies</DisplayText>
          <DisplayText size="">
            - Supported currencies are for the following countries; Kenya,
            Uganda, Tanzania, Naira & CFA in Ivory Coast(Côte d'Ivoire)
          </DisplayText>
        </Layout.Section>
        <Layout.Section>
          <DisplayText size="small">
            I have added products in woocomerce & sendy fulfillment separately,
            what will happen?
          </DisplayText>
          <DisplayText size="">
            - Products & orders will not synch corretly since there was no
            api_key and username linking sendy fulfillment to your wordpress
            account. Please reach out to us on merchantapi@sendyit.com and we
            can help you resolve this.
          </DisplayText>
        </Layout.Section>
        <Layout.Section>
          <DisplayText size="small">
            My orders are not being created after switching environments
          </DisplayText>
          <DisplayText size="">
            - If you had been using the test environment to add products then
            they have not synced to your live account. This will cause the order
            placement process to fail if you have switched to the live
            environment. To avoid this please click on the sync all products
            button in the inventory tab to make sure your products are available
            on you live account.
          </DisplayText>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
