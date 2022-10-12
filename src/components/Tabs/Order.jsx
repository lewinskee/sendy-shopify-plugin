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

export function Order() {
  const [loading, setLoading] = useState(false);
  const handleLoadingChange = useCallback((value) => setLoading(value), []);
  const [inputs, setInputs] = useState({});
  const handleInputChange = useCallback((value) => setInputs(value), []);
  const [placeOrder, setPlaceOrder] = useState(false);
  const handlePlaceOrderChange = useCallback(
    (newChecked) => setPlaceOrder(newChecked),
    []
  );

  const [trackingLink, setTrackingLink] = useState(false);
  const handleTrackingLinkChange = useCallback(
    (newChecked) => setTrackingLink(newChecked),
    []
  );

  const [collectAmount, setCollectAmount] = useState(false);
  const handleCollectAmountChange = useCallback(
    (newChecked) => setCollectAmount(newChecked),
    []
  );

  const [pickUpAddress, setPickUpAddress] = useState();
  const handlePickUpAddressChange = useCallback(
    (value) => setPickUpAddress(value),
    []
  );
  const [pickUpAddressLat, setPickUpAddressLat] = useState();
  const handlePickUpAddressLatChange = useCallback(
    (value) => setPickUpAddressLat(value),
    []
  );
  const [pickUpAddressLng, setPickUpAddressLng] = useState();
  const handlePickUpAddressLngChange = useCallback(
    (value) => setPickUpAddressLng(value),
    []
  );
  const [deliveryInfo, setDeliveryInfo] = useState();
  const handleDeliveryInfoChange = useCallback(
    (value) => setDeliveryInfo(value),
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
    handlePlaceOrderChange(values.placeOrder);
    handleTrackingLinkChange(values.trackingLink);
    handleCollectAmountChange(values.collectAmount);
    handlePickUpAddressChange(values.pickUpAddress);
    handleDeliveryInfoChange(values.deliveryInfo);
    handlePickUpAddressLatChange(values.pickUpAddressLat);
    handlePickUpAddressLngChange(values.pickUpAddressLng);
  };

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const saveOrderSettings = () => {
    const inputVariables = [
      {
        key: "Place Order On Fulfillment",
        input: inputs.placeOrder,
        value: placeOrder,
        object: "placeOrder",
      },
      {
        key: "Include Tracking Link & Status",
        input: inputs.trackingLink,
        value: trackingLink,
        object: "trackingLink",
      },
      {
        key: "Include Collect Amount",
        input: inputs.collectAmount,
        value: collectAmount,
        object: "collectAmount",
      },
      {
        key: "Pick Up Address",
        input: inputs.pickUpAddress,
        value: pickUpAddress,
        object: "pickUpAddress",
      },
      {
        key: "Additional Delivery Info",
        input: inputs.deliveryInfo,
        value: deliveryInfo,
        object: "deliveryInfo",
      },
      {
        key: "Pick Up Address Latitude",
        input: inputs.pickUpAddressLat,
        value: pickUpAddressLat,
        object: "pickUpAddressLat",
      },
      {
        key: "Pick Up Address Longitude",
        input: inputs.pickUpAddressLng,
        value: pickUpAddressLng,
        object: "pickUpAddressLng",
      },
    ];
    inputVariables.forEach((row) => {
      if (row.input && row.value) {
        updateOrderSettings({
          id: row.input.id,
          value: row.value,
          type: [
            "Place Order On Fulfillment",
            "Include Tracking Link & Status",
            "Include Collect Amount",
          ].includes(row.key)
            ? "boolean"
            : "string",
        });
      } else if (row.input && !row.value) {
        delete inputs[row.object];
        deleteOrderSettings({
          id: row.input.id,
        });
      } else if (!row.input && row.value) {
        createOrderSettings({
          namespace: "Order settings",
          key: row.key,
          value: row.value,
          type: [
            "Place Order On Fulfillment",
            "Include Tracking Link & Status",
            "Include Collect Amount",
          ].includes(row.key)
            ? "boolean"
            : "string",
        });
      }
    });
  };

  const getOrderSettings = useCallback(async () => {
    handleLoadingChange(true);
    const response = await fetch("/get-metafields").then((res) => res.json());
    const inputValues = {
      placeOrder: false,
      trackingLink: false,
      collectAmount: false,
      pickUpAddress: "",
      deliveryInfo: "",
      pickUpAddressLat: "",
      pickUpAddressLng: "",
    };
    response.forEach((row) => {
      if (row.key === "Place Order On Fulfillment") {
        inputValues.placeOrder = row.value;
        inputs.placeOrder = row;
      } else if (row.key === "Include Tracking Link & Status") {
        inputValues.trackingLink = row.value;
        inputs.trackingLink = row;
      } else if (row.key === "Include Collect Amount") {
        inputValues.collectAmount = row.value;
        inputs.collectAmount = row;
      } else if (row.key === "Pick Up Address") {
        inputValues.pickUpAddress = row.value;
        inputs.pickUpAddress = row;
      } else if (row.key === "Additional Delivery Info") {
        inputValues.deliveryInfo = row.value;
        inputs.deliveryInfo = row;
      } else if (row.key === "Pick Up Address Latitude") {
        inputValues.pickUpAddressLat = row.value;
        inputs.pickUpAddressLat = row;
      } else if (row.key === "Pick Up Address Longitude") {
        inputValues.pickUpAddressLng = row.value;
        inputs.pickUpAddressLng = row;
      }
      handleInputChange(inputs);
    });
    sortInputValues(inputValues);
    handleLoadingChange(false);
  }, []);

  const createOrderSettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/create-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "Place Order On Fulfillment") {
      handlePlaceOrderChange(response.metafield.value);
    } else if (response.metafield.key === "Include Tracking Link & Status") {
      handleTrackingLinkChange(response.metafield.value);
    } else if (response.metafield.key === "Include Collect Amount") {
      handleCollectAmountChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address") {
      handlePickUpAddressChange(response.metafield.value);
    } else if (response.metafield.key === "Additional Delivery Info") {
      handleDeliveryInfoChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address Latitude") {
      handlePickUpAddressLatChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address Longitude") {
      handlePickUpAddressLngChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const updateOrderSettings = useCallback(async (payload) => {
    handleLoadingChange(true);
    const response = await fetch("/update-metafields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (response.metafield.key === "Place Order On Fulfillment") {
      handlePlaceOrderChange(response.metafield.value);
    } else if (response.metafield.key === "Include Tracking Link & Status") {
      handleTrackingLinkChange(response.metafield.value);
    } else if (response.metafield.key === "Include Collect Amount") {
      handleCollectAmountChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address") {
      handlePickUpAddressChange(response.metafield.value);
    } else if (response.metafield.key === "Additional Delivery Info") {
      handleDeliveryInfoChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address Latitude") {
      handlePickUpAddressLatChange(response.metafield.value);
    } else if (response.metafield.key === "Pick Up Address Longitude") {
      handlePickUpAddressLngChange(response.metafield.value);
    }
    handleLoadingChange(false);
    toggleActive(true);
  }, []);

  const deleteOrderSettings = useCallback(async (payload) => {
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
    getOrderSettings();
  }, []);

  const initializeGoogleMaps = useCallback(async () => {
    const script = document.createElement("script");
    script.onload = () => {
      setUpGoogleMaps();
    };
    const url =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4UV3vk4qedVcCXDdpY7ZBNb4IQAM4vY8&libraries=places";
    script.src = url;
    if (document.querySelectorAll(`script[src="${url}"]`).length === 0) {
      document.head.appendChild(script);
    } else {
      setUpGoogleMaps();
    }
  }, []);

  const setUpGoogleMaps = useCallback(async () => {
    let options = {
      componentRestrictions: {
        country: ["ke", "ug", "tz"],
      },
    };
    let input = document.getElementById("sendy-google-places");
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      var place = autocomplete.getPlace();
      console.log(place);
      let region = "";
      place.adr_address.split(",").forEach((adr) => {
        if (adr.startsWith(" <")) {
          const middle = adr.slice(adr.indexOf(">") + 1, adr.lastIndexOf("<"));
          region = `${region}, ${middle}`;
        }
      });
      const name = `${place.name}${region}`;
      handlePickUpAddressChange(name);
      handlePickUpAddressLatChange(place.geometry.location.lat());
      handlePickUpAddressLngChange(place.geometry.location.lng());
    });
  }, []);

  // Lifetime Hooks
  // When component first loads
  useEffect(() => {
    getOrderSettings();
    initializeGoogleMaps();
  }, []);
  // When component updates
  useEffect(() => {
    getOrderSettings;
  }, [getOrderSettings]);
  // When component updates
  useEffect(() => {
    createOrderSettings;
  }, [createOrderSettings]);
  // When component updates
  useEffect(() => {
    updateOrderSettings;
  }, [updateOrderSettings]);
  // When component updates
  useEffect(() => {
    deleteOrderSettings;
  }, [deleteOrderSettings]);

  return (
    <Page fullWidth>
      <Layout>
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
              <p>Place Order On Fulfillment</p>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 8, xl: 8 }}>
              <Checkbox
                label="- When checked, a fulfillment order will be placed once a customer places an order on your e-commerce site"
                checked={placeOrder}
                onChange={handlePlaceOrderChange}
                disabled={loading}
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
                checked={trackingLink}
                onChange={handleTrackingLinkChange}
                disabled={loading}
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
                checked={collectAmount}
                onChange={handleCollectAmountChange}
                disabled={loading}
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
                value={pickUpAddress}
                onChange={handlePickUpAddressChange}
                autoComplete="off"
                align="left"
                disabled={loading}
                id="sendy-google-places"
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
                value={deliveryInfo}
                onChange={handleDeliveryInfoChange}
                autoComplete="off"
                align="left"
                disabled={loading}
              />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        <Layout.Section>
          <Button primary loading={loading} onClick={saveOrderSettings}>
            Save
          </Button>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
