import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const parser = {
  file_name: '',
  parseMarkdown(markdown, sanitize = true) {
    const lines = markdown.split('\n');
    let result = {
      td_name: '',
      items: [],
    };

    let currentContent = '';
    let questionNumber = 0;
    let tdNameSet = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('# ') && !tdNameSet) {
        result.td_name = line.substring(2);
        tdNameSet = true;
      } else if (line === 'Questions :') {
        if (currentContent) {
          result.items.push({
            type: 'ContentCard',
            props: {
              //content: currentContent.trim(),
              content: this.convertMarkdownToHtml(
                currentContent.trim(),
                sanitize
              ),
            },
          });
          currentContent = '';
        }

        // Parse questions
        while (++i < lines.length) {
          const questionLine = lines[i].trim();
          if (!questionLine.match(/^\d+\./)) break;

          result.items.push({
            type: 'TaskCard',
            props: {
              questionNumber: questionNumber++,
              content: questionLine
                .substring(questionLine.indexOf('.') + 1)
                .trim(),
            },
          });
        }
        i--; // Adjust index to account for the extra increment in the loop
      } else {
        currentContent += line + '\n';
      }
    }

    // Add any remaining content
    if (currentContent) {
      result.items.push({
        type: 'ContentCard',
        props: {
          //content: currentContent.trim(),
          content: this.convertMarkdownToHtml(currentContent.trim(), sanitize),
        },
      });
    }
    this.file_name = result.td_name;
    return result;
  },

  // Function to convert markdown to HTML, with optional sanitization
  convertMarkdownToHtml(markdown, sanitize = true) {
    const html = marked(markdown);
    return sanitize ? DOMPurify.sanitize(html) : html;
  },

  createJsonFile(jsonData) {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    return url;
  },
};
