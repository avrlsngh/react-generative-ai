import useLocalStorage from "../../hooks/localStorage.hook";
import TopicListHeading from "../Topics/TopicListHeading.component";
import TopicListView from "../Topics/TopicListView.component";

function CustomTab() {
  let [customTopics] = useLocalStorage("custom_topics");
  customTopics = JSON.parse(customTopics);
  return (
    <>
      <TopicListHeading headingText={"Custom Topics"} />
      <TopicListView topicList={customTopics === null ? [] : customTopics} />
    </>
  );
}

export default CustomTab;
