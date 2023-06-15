import React, { Suspense, lazy, useCallback, useState } from "react";
import TabPanel from "../components/Tabs/TabPanel.component";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import AddTopicModal from "../components/AddTopic/AddTopicModal.component";

// lazy load components for faster render
const AllTab = lazy(() => import("../components/Tabs/AllTab.component"));
const CustomTab = lazy(() => import("../components/Tabs/CustomTab.component"));
const ICPTab = lazy(() => import("../components/Tabs/ICPTab.component"));
const MissionTab = lazy(() =>
  import("../components/Tabs/MissionTab.component")
);
const ProductTab = lazy(() =>
  import("../components/Tabs/ProductTab.component")
);

export const TABS_MAP = [
  { label: "All", child: <AllTab /> },
  { label: "Custom", child: <CustomTab /> },
  { label: "ICP", child: <ICPTab /> },
  { label: "Mission", child: <MissionTab /> },
  { label: "Product", child: <ProductTab /> },
];

export default function Categories() {
  // set the value as the pointer to tab index
  // set default value to 3 for 'Mission' Tab
  const [value, setValue] = useState(3);
  const handleChangeTabs = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const tabsPanelRendered = TABS_MAP.map((tab, index) => (
    <TabPanel value={value} index={index} key={index}>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        {tab.child}
      </Suspense>
    </TabPanel>
  ));

  return (
    <>
      <h1 className="font-bold ml-6 mt-4">Categories</h1>
      <div className="flex justify-between w-100 pr-6 pl-7 mt-6">
        <Tabs
          value={value}
          onChange={handleChangeTabs}
          aria-label="basic tabs example"
        >
          {TABS_MAP.map((tab, index) => (
            <Tab label={tab.label || ""} key={index} />
          ))}
        </Tabs>
        <AddTopicModal setTabValue={setValue} />
      </div>
      {tabsPanelRendered}
    </>
  );
}
