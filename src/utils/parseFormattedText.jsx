// Syntax: **bold text** and [[color:text]], e.g. [[red:Unlucky]]
const FORMAT_REGEX = /\*\*(.+?)\*\*|\[\[(\w+):(.+?)\]\]/g;

const parseFormattedText = (text) => {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  let match;

  while ((match = FORMAT_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      nodes.push(<span key={key++} style={{ color: match[2] }}>{match[3]}</span>);
    }

    lastIndex = FORMAT_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

export default parseFormattedText;
