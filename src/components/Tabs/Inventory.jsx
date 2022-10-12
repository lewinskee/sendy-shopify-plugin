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
import { useState, useEffect, useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

export function Inventory() {
  const [loading, setLoading] = useState(false);
  const handleLoadingChange = useCallback((value) => setLoading(value), []);
  const [inputs, setInputs] = useState({});
  const handleInputChange = useCallback((value) => setInputs(value), []);
  const [syncProduct, setSyncProduct] = useState(false);
  const handleSyncProductChange = useCallback(
    (newChecked) => setSyncProduct(newChecked),
    []
  );

  const [currency, setCurrency] = useState();
  const handleCurrencyChange = useCallback((value) => setCurrency(value), []);

  const [quantityType, setQuantityType] = useState();
  const handleQuantityTypeChange = useCallback(
    (value) => setQuantityType(value),
    []
  );

  const [quantity, setQuantity] = useState();
  const handleQuantityChange = useCallback((value) => setQuantity(value), []);

  const [active, setActive] = useState(false);
  const toggleActive = useCallback((value) => {
    setActive(value);
    setTimeout(() => {
      setActive(false);
    }, 5000);
  }, []);

  const sortInputValues = (values) => {
    handleSyncProductChange(values.syncProduct);
    handleCurrencyChange(values.currency);
    handleQuantityTypeChange(values.quantityType);
    handleQuantityChange(values.quantity);
  };

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const saveInventorySettings = () => {
    const inputVariables = [
      {
        key: "Sync Products On Change",
        input: inputs.syncProduct,
        value: syncProduct,
        object: "syncProduct",
      },
      {
        key: "Default Currency",
        input: inputs.currency,
        value: currency,
        object: "currency",
      },
      {
        key: "Default Quantity Type",
        input: inputs.quantityType,
        value: quantityType,
        object: "quantityType",
      },
      {
        key: "Default Quantity",
        input: inputs.quantity,
        value: quantity,
        object: "quantity",
      },
    ];
    inputVariables.forEach((row) => {
      if (row.input && row.value) {
        updateInventorySettings({
          id: row.input.id,
          value: row.value,
          type: row.key === "Sync Products On Change" ? "boolean" : "string",
        });
      } else if (row.input && !row.value) {
        delete inputs[row.object];
        deleteInventorySettings({
          id: row.input.id,
        });
      } else if (!row.input && row.value) {
        createInventorySettings({
          namespace: "Inventory settings",
          key: row.key,
          value: row.value,
          type: row.key === "Sync Products On Change" ? "boolean" : "string",
        });
      }
    });
  };

  const getInventorySettings = useCallback(async () => {
    handleLoadingChange(true);
    const response = await fetch("/get-metafields").then((res) => res.json());
    const inputValues = {
      syncProduct: false,
      currency: "kes",
      quantityType: "g",
      quantity: "",
    };
    response.forEach((row) => {
      if (row.key === "Sync Products On Change") {
        inputValues.syncProduct = row.value;
        inputs.syncProduct = row;
      } else if (row.key === "Default Currency") {
        inputValues.currency = row.value;
        inputs.currency = row;
      } else if (row.key === "Default Quantity Type") {
        inputValues.quantityType = row.value;
        inputs.quantityType = row;
      } else if (row.key === "Default Quantity") {
        inputValues.quantity = row.value;
        inputs.quantity = row;
      }
      handleInputChange(inputs);
    });
    sortInputValues(inputValues);
    handleLoadingChange(false);
  }, []);

  const createInventorySettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/create-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "Sync Products On Change") {
      handleSyncProductChange(response.metafield.value);
    } else if (response.metafield.key === "Default Currency") {
      handleCurrencyChange(response.metafield.value);
    } else if (response.metafield.key === "Default Quantity Type") {
      handleQuantityTypeChange(response.metafield.value);
    } else if (response.metafield.key === "Default Quantity") {
      handleQuantityChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const updateInventorySettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/update-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "Sync Products On Change") {
      handleSyncProductChange(response.metafield.value);
    } else if (response.metafield.key === "Default Currency") {
      handleCurrencyChange(response.metafield.value);
    } else if (response.metafield.key === "Default Quantity Type") {
      handleQuantityTypeChange(response.metafield.value);
    } else if (response.metafield.key === "Default Quantity") {
      handleQuantityChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const deleteInventorySettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/delete-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    handleLoadingChange(false);
    toggleActive(true);
    getInventorySettings();
  }, []);

  // Lifetime Hooks
  // When component first loads
  useEffect(() => {
    getInventorySettings();
  }, []);
  // When component updates
  useEffect(() => {
    getInventorySettings;
  }, [getInventorySettings]);
  // When component updates
  useEffect(() => {
    createInventorySettings;
  }, [createInventorySettings]);
  // When component updates
  useEffect(() => {
    updateInventorySettings;
  }, [updateInventorySettings]);
  // When component updates
  useEffect(() => {
    deleteInventorySettings;
  }, [deleteInventorySettings]);

  const currencyOptions = [{ label: "KES", value: "kes" }];
  const quantityTypeOptions = [
    { label: "GRAM", value: "g" },
    { label: "KILOGRAM", value: "kg" },
    { label: "LITRE", value: "l" },
    { label: "MILLILITRE", value: "ml" },
  ];
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Required fields" status="info">
            <p>
              During delivery and pickup, Sendy Fulfilment needs to know the
              product weight or capacity for delivery consolidation purposes. We
              also need to know the price of each product for insurance
              purposes.
            </p>
          </Banner>
        </Layout.Section>
        <Layout.Section>
          {active && (
            <Banner
              title=""
              status="success"
              onDismiss={() => toggleActive(false)}
            >
              <p>Settings updated</p>
            </Banner>
          )}
        </Layout.Section>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 1, md: 1, lg: 2, xl: 2 }}>
              <p>Sync Products On Change</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When this is checked your inventory will synch automatically when you update your products"
                checked={syncProduct}
                onChange={handleSyncProductChange}
                disabled={loading}
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
                onChange={handleCurrencyChange}
                value={currency}
                disabled={loading}
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
                onChange={handleQuantityTypeChange}
                value={quantityType}
                disabled={loading}
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
                value={quantity}
                onChange={handleQuantityChange}
                autoComplete="off"
                align="left"
                disabled={loading}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Button primary loading={loading} onClick={saveInventorySettings}>
            Save
          </Button>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
