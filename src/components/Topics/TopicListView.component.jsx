import { Divider } from "@mui/material";
import { useCallback, useState } from "react";
import TopicItemActions from "./TopicItemActions.component";
import TopicTags from "./TopicTags.component";

function TopicListView({ topicList = [] }) {
  const [topics, setTopics] = useState(topicList);

  const deleteTopic = useCallback((topic) => {
    setTopics(topics.filter((filterTopic) => filterTopic.id !== topic.id));
    localStorage.removeItem(`${topic.category}_topic_${topic.id}_editor_text`);
    localStorage.removeItem(`${topic.category}_topic_${topic.id}_generated`);
  }, []);
  return (
    <div className="border border-slate-300 border-t-0">
      {topics.length !== 0 ? (
        topics.map((topic, topicIndex) => (
          <>
            {topicIndex !== 0 && <Divider />}
            <div
              className="px-4 py-4 flex justify-between items-center"
              key={topic.id}
            >
              <div>
                {/* don't show divider on top of first element */}
                <h5>{topic.description}</h5>
                <TopicTags tags={topic.tags} />
              </div>
              <TopicItemActions topic={topic} deleteTopic={deleteTopic} />
            </div>
          </>
        ))
      ) : (
        <p className="w-100 text-sm text-gray-500 py-4 text-center">
          No Topics Added
        </p>
      )}
    </div>
  );
}

export default TopicListView;
