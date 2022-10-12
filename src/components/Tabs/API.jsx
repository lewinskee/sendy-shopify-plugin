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
  Toast,
  Frame,
} from "@shopify/polaris";
import { useState, useEffect, useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

export function API() {
  const [loading, setLoading] = useState(false);
  const handleLoadingChange = useCallback((value) => setLoading(value), []);
  const [inputs, setInputs] = useState({});
  const handleInputChange = useCallback((value) => setInputs(value), []);
  const [businessName, setBusinessName] = useState();
  const handleBusinessNameChange = useCallback(
    (value) => setBusinessName(value),
    []
  );
  const [businessEmail, setBusinessEmail] = useState();
  const handleBusinessEmailChange = useCallback(
    (value) => setBusinessEmail(value),
    []
  );
  const [apiUsername, setApiUsername] = useState();
  const handleApiUsernameChange = useCallback(
    (value) => setApiUsername(value),
    []
  );
  const [environment, setEnvironment] = useState();
  const handleEnvironmentChange = useCallback(
    (value) => setEnvironment(value),
    []
  );

  const [active, setActive] = useState(false);
  const toggleActive = useCallback((value) => {
    setActive(value);
    setTimeout(() => {
      setActive(false);
    }, 5000);
  }, []);

  const sortInputValues = (values) => {
    handleBusinessNameChange(values.businessName);
    handleBusinessEmailChange(values.businessEmail);
    handleApiUsernameChange(values.apiUsername);
    handleEnvironmentChange(values.environment);
  };

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const saveAPISettings = () => {
    const inputVariables = [
      {
        key: "Business Name",
        input: inputs.businessName,
        value: businessName,
        object: "businessName",
      },
      {
        key: "Business Email",
        input: inputs.businessEmail,
        value: businessEmail,
        object: "businessEmail",
      },
      {
        key: "API Username",
        input: inputs.apiUsername,
        value: apiUsername,
        object: "apiUsername",
      },
      {
        key: "Environment",
        input: inputs.environment,
        value: environment,
        object: "environment",
      },
    ];
    inputVariables.forEach((row) => {
      if (row.input && row.value) {
        updateAPISettings({
          id: row.input.id,
          value: row.value,
          type: "string",
        });
      } else if (row.input && !row.value) {
        delete inputs[row.object];
        deleteAPISettings({
          id: row.input.id,
        });
      } else if (!row.input && row.value) {
        createAPISettings({
          namespace: "API credentials",
          key: row.key,
          value: row.value,
          type: "string",
        });
      }
    });
  };

  const getAPISettings = useCallback(async () => {
    handleLoadingChange(true);
    const response = await fetch("/get-metafields").then((res) => res.json());
    const inputValues = {
      businessName: "",
      businessEmail: "",
      apiUsername: "",
      environment: "test",
    };
    response.forEach((row) => {
      if (row.key === "API Username") {
        inputValues.apiUsername = row.value;
        inputs.apiUsername = row;
      } else if (row.key === "Business Email") {
        inputValues.businessEmail = row.value;
        inputs.businessEmail = row;
      } else if (row.key === "Business Name") {
        inputValues.businessName = row.value;
        inputs.businessName = row;
      } else if (row.key === "Environment") {
        inputValues.environment = row.value;
        inputs.environment = row;
      }
      handleInputChange(inputs);
    });
    sortInputValues(inputValues);
    handleLoadingChange(false);
  }, []);

  const createAPISettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/create-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "API Username") {
      handleApiUsernameChange(response.metafield.value);
    } else if (response.metafield.key === "Business Email") {
      handleBusinessEmailChange(response.metafield.value);
    } else if (response.metafield.key === "Business Name") {
      handleBusinessNameChange(response.metafield.value);
    } else if (response.metafield.key === "Environment") {
      handleEnvironmentChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const updateAPISettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/update-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "API Username") {
      handleApiUsernameChange(response.metafield.value);
    } else if (response.metafield.key === "Business Email") {
      handleBusinessEmailChange(response.metafield.value);
    } else if (response.metafield.key === "Business Name") {
      handleBusinessNameChange(response.metafield.value);
    } else if (response.metafield.key === "Environment") {
      handleEnvironmentChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const deleteAPISettings = useCallback(async (payload) => {
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
    getAPISettings();
  }, []);

  // Lifetime Hooks
  // When component first loads
  useEffect(() => {
    getAPISettings();
  }, []);
  // When component updates
  useEffect(() => {
    getAPISettings;
  }, [getAPISettings]);
  // When component updates
  useEffect(() => {
    createAPISettings;
  }, [createAPISettings]);
  // When component updates
  useEffect(() => {
    updateAPISettings;
  }, [updateAPISettings]);
  // When component updates
  useEffect(() => {
    deleteAPISettings;
  }, [deleteAPISettings]);

  // Data Variables
  const options = [
    { label: "Test", value: "test" },
    { label: "Live", value: "live" },
  ];

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Configurations" status="info">
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
              <p>Business Name</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <TextField
                label=""
                labelHidden
                value={businessName}
                onChange={handleBusinessNameChange}
                autoComplete="off"
                align="left"
                disabled={loading}
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
                value={businessEmail}
                onChange={handleBusinessEmailChange}
                autoComplete="off"
                align="left"
                disabled={loading}
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
                value={apiUsername}
                onChange={handleApiUsernameChange}
                autoComplete="off"
                align="left"
                disabled={loading}
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
                onChange={handleEnvironmentChange}
                value={environment}
                disabled={loading}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Button primary loading={loading} onClick={saveAPISettings}>
            Save
          </Button>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
