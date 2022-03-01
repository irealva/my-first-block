import { FileBlockProps, getLanguageFromFilename } from "@githubnext/utils";
import "./index.css";

export default function (props: FileBlockProps) {
  const { context, content, metadata, onUpdateMetadata } = props;
  const language = Boolean(context.path)
    ? getLanguageFromFilename(context.path)
    : "N/A";

  const json = convertCsvToJson(content);

  return (
    <div className="Box m-4">
      <div className="Box-header">
        <h3 className="Box-title">
          File: {context.path} {language}
        </h3>
      </div>
      <div className="Box-body">
        <pre className="mt-3 p-3">{JSON.stringify(json, null, 2)}</pre>
      </div>
    </div>
  );
}

// convert csv content to json
const convertCsvToJson = (csv: string) => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const json = lines
    .slice(1)
    .map((line) => {
      const values = line.split(",");
      return headers.reduce(
        (obj: any, header, index) => ({
          ...obj,
          [header]: values[index],
        }),
        {}
      );
    });

  return json;
}
