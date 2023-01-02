"""
USAGE: 
python3 md_to_text.py [FILE.md] [NEW_FILE.tex]

NOTE: This doesn't work 100% yet but it takes care of a lot of the tedious stuff. Still need to go in after and clean the tex up.
"""

import re
from sys import argv

# read markdown
MD_LOC = argv[1]
TEX_LOC = argv[2]
with open(MD_LOC, "r") as f:
    MD = f.read()

# # bold key words
TEX = re.sub(r"\*\*([^\*\*]*)\*\*", r"\\kw{\1}", MD)

# italicise emphasis
TEX = re.sub(r"\*([^\*]*)\*", r"\\emph{\1}", TEX)

# headings
TEX = re.sub(r"### (.*)", r"\\subsection*{\1}", TEX)
TEX = re.sub(r"## [0-9].[0-9] (.*)", r"\\section{\1}", TEX)
TEX = re.sub(r"# (.*)", r"\\setchapterpreamble[u]{\\margintoc}\n\n\\chapter{\1}", TEX)

# epigraph

# sidenotes

# margin notes

# code blocks
TEX = re.sub(r"\`\`\`[a-zA-Z]+\n(([^\`\`\`]*\n)*)\`\`\`", r"\\begin{lstlisting}[language=Java]\n\1\\end{lstlisting}", TEX)

TEX = re.sub(r"\`\`\`\n(([^\`\`\`]*\n)*)\`\`\`", r"\\begin{verbatim}\n\1\\end{verbatim}", TEX)

# code spans
TEX = re.sub(r"\`([^\`]*)\`", r"\\texttt{\1}", TEX)

# boxes

# hyperlinks
TEX = re.sub(r"\[(.*)\]\((.*)\)", r"\\href{\2}{\1}", TEX)

# urls
TEX = re.sub(r"(http:\/\/.*:\d*\S*)", r"\\url{\1}", TEX)

# lists

# write tex file
with open(TEX_LOC, "w") as f:
    f.write(TEX)
