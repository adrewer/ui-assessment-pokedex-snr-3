import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactMarkdown from 'react-markdown';
import README from '../README.md';

// Home page that loads and displays the README as markdown
export const Home = () => {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // Fetch README content and convert to plain text
    fetch(README)
      .then((res) => res.text())
      .then((res) => {
        setMarkdown(res);
      });
  }, []);

  return (
    <div className={classes.root}>
      {/* Render markdown content with styled layout */}
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

// Page-level styles for markdown layout
const useStyles = createUseStyles(
  {
    root: {
      minWidth: '100%',
      minHeight: '100%',
      padding: '24px 20%',
      boxSizing: 'border-box',

      // Paragraph styling
      '& p': {
        color: 'rgba(255,255,255,.68)',
      },

      // Horizontal rule styling
      '& hr': {
        margin: '24px 0px',
        borderTop: '1px solid rgba(255,255,255,.3)',
        borderBottom: '0px',
        borderLeft: '0px',
        borderRight: '0px',
      },

      // Shared line height for paragraphs and list items
      '& p, & li': {
        lineHeight: '24px',
      },

      // List item spacing
      '& li': {
        marginTop: '12px',
      },
    },

    // Responsive padding for large screens
    '@media (min-width: 1024px)': {
      root: {
        padding: '24px 32px',
      },
    },
  },
  { name: 'Home' }
);
