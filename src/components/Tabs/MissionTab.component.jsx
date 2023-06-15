import React from "react";
import TopicListHeading from "../Topics/TopicListHeading.component";
import TopicListView from "../Topics/TopicListView.component";
import { TOPICS_MAP } from "../../utils/helper";

function MissionTab() {
  return (
    <>
      <TopicListHeading headingText={"Recommended Topics"} />
      <TopicListView topicList={TOPICS_MAP} />
    </>
  );
}

export default MissionTab;
