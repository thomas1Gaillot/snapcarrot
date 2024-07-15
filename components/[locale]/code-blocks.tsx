import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDarkReasonable} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlocks = ({codeString}: { codeString: string }) => {
    return (
        <SyntaxHighlighter language="typescript" style={atomOneDarkReasonable}>
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlocks;