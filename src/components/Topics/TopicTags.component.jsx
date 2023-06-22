import { tagColorClasses } from "../../utils/helper";

function TopicTags({ tags = [] }) {
  return tags === null ? (
    <></>
  ) : (
    tags.map((tag, tagIndex) => (
      <span
        className={`border ${
          tagColorClasses[tagIndex % 3]
        } rounded px-1 py-0.5 text-xs font-bold mr-2`}
        key={tagIndex}
      >
        {tag}
      </span>
    ))
  );
}

export default TopicTags;
