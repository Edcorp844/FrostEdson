// components/CodeBlock.tsx

'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeString = `
//created by Frost Edson
//Every code is writen with the client and boss in mind

import SwiftUI 

struct ContentView: View {
  @State var items = [ProfilePicture]()

    var body: some View {
        VStack(alignment: .leading) {
            VStack {
                CircularImage(photo: items[0])
            }
            .center()
            .onHover(zoomIn(.fitBox))
            SnackBar {
                Text("Hover here to expand profile picture")
                .textAlignment(.justify)
                .wrap()
            }
            .alignment(.bottom)
            .padding(.all, 4)
            .pointer(sfImage{hand})
        }
    }
}
`;

const CodeBlock = () => {
    return (
        <div className="my-2 overflow-auto rounded-xl text-white shadow-lg">
            <SyntaxHighlighter
                language="swift"
                style={oneDark}
                showLineNumbers
                wrapLines
                wrapLongLines
                customStyle={{
                    background: 'transparent',
                    fontSize: '0.875rem', // Tailwind text-sm
                    lineHeight: '1.5rem', // Tailwind leading-6
                    color: 'white'
                }}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
