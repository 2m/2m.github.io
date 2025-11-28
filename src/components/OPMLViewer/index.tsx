import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

const OPMLViewer = ({ url }) => {
  const [opmlData, setOpmlData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndParseOPML = async () => {
      if (!url) {
        setError('No OPML URL provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch OPML: ${response.status} ${response.statusText}`);
        }

        const xmlString = await response.text();
        const parsed = parseOPML(xmlString);
        setOpmlData(parsed);
        setError(null);
      } catch (err) {
        setError(err.message);
        setOpmlData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAndParseOPML();
  }, [url]);

  const parseOPML = (xmlString) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Invalid XML format');
      }

      const head = xmlDoc.querySelector('head');
      const body = xmlDoc.querySelector('body');

      const title = head?.querySelector('title')?.textContent || 'Untitled OPML';
      const dateCreated = head?.querySelector('dateCreated')?.textContent;

      const parseOutline = (outline) => {
        const node = {
          text: outline.getAttribute('text') || outline.getAttribute('title') || 'Untitled',
          type: outline.getAttribute('type'),
          xmlUrl: outline.getAttribute('xmlUrl'),
          category: outline.getAttribute('category'),
          children: []
        };

        const childOutlines = outline.querySelectorAll(':scope > outline');
        for (const child of childOutlines) {
          node.children.push(parseOutline(child));
        }

        return node;
      };

      const outlines = body?.querySelectorAll(':scope > outline') || [];
      const allNodes = Array.from(outlines).map(parseOutline);

      // Flatten all feeds
      const feeds = [];
      const collectFeeds = (nodes) => {
        for (const node of nodes) {
          if (node.xmlUrl) {
            feeds.push(node);
          }
          if (node.children.length > 0) {
            collectFeeds(node.children);
          }
        }
      };
      collectFeeds(allNodes);

      // Group feeds by category
      const groupedByCategory = {};
      for (const feed of feeds) {
        const category = feed.category || 'Uncategorized';
        if (!groupedByCategory[category]) {
          groupedByCategory[category] = [];
        }
        groupedByCategory[category].push(feed);
      }

      // Convert to array and sort categories
      const categories = Object.keys(groupedByCategory).sort((a, b) => {
        return a.localeCompare(b);
      });

      return {
        title,
        dateCreated,
        categories: categories.map(cat => ({
          name: cat,
          feeds: groupedByCategory[cat]
        }))
      };
    } catch (err) {
      throw new Error(`Failed to parse OPML: ${err.message}`);
    }
  };

  const FeedItem = ({ feed }) => {
    return (
      <div>
        <a href={feed.xmlUrl} target="_blank" rel="noopener noreferrer">
          <span>{feed.text}</span>
        </a>
      </div>
    );
  };

  const CategorySection = ({ category }) => {
    return (
      <div style={{ marginBottom: '1em'}}>
        <h3>
          <span>{category.name}</span>
        </h3>

        <div>
          {category.feeds.map((feed) => (
            <FeedItem key={feed.xmlUrl} feed={feed} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <Loader />
        <span>Loading OPML...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!opmlData || !opmlData.categories) {
    return null;
  }

  return (
    <div>
      {opmlData.categories.map((category) => (
        <CategorySection key={category.name} category={category} />
      ))}
    </div>
  );
};

export default OPMLViewer;
