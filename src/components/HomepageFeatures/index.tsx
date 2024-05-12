import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';

type FeatureItem = {
  title: string;
  page: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

// icons from https://undraw.co/search
const FeatureList: FeatureItem[] = [
  {
    title: 'Personal Blog',
    page: 'blog',
    Svg: require('@site/static/img/undraw_blog_post_re_fy5x.svg').default,
    description: (
      <>
        Started as a Google Summer Of Code 2010 log and expanded to various different topics.
        <p className={styles.feeds}>
          <Icon style={{ color: 'orange' }} icon="mdi:rss-feed-box" />
          <a href="blog/rss.xml">RSS</a>
          <a href="blog/atom.xml">Atom</a>
          <a href="blog/feed.json">JSON</a>
        </p>
      </>
    ),
  },
  {
    title: 'RallyEye',
    page: 'https://rallyeye.2m.lt',
    Svg: require('@site/static/img/undraw_navigator_a479.svg').default,
    description: (
      <>
        Rally results visualizer.
        Discover stories in real and sim rallies that usually hide in the numbers of result times.
      </>
    ),
  },
  {
    title: 'rbr-sync',
    page: 'https://github.com/2m/rbr-sync',
    Svg: require('@site/static/img/undraw_synchronize_re_4irq.svg').default,
    description: (
      <>
        Small app for synchronizing Richard Burns Rally favorite stages from a Notion database.
      </>
    ),
  },
  {
    title: 'the-button.com',
    page: 'https://the-button.com',
    Svg: require('@site/static/img/undraw_online_ad_re_ol62.svg').default,
    description: (
      <>
        A multiplayer save-the-world-every-108-minutes game inspired by the TV show "Lost".
      </>
    ),
  },
  {
    title: 'Zero Button Audiobook Player',
    page: 'https://github.com/2m/zbap',
    Svg: require('@site/static/img/undraw_dreamer_re_9tua.svg').default,
    description: (
      <>
        Audiobook player based on Raspberry Pi and controller by NFC tags or HTTP requests.
      </>
    ),
  },
  {
    title: 'C.A.T.S.',
    page: 'cats',
    Svg: require('@site/static/img/undraw_artificial_intelligence_re_enpp.svg').default,
    description: (
      <>
        Cooperative autonomous tracking system. Doing serious networking, math and engineering while playing with Lego.
      </>
    ),
  },
];

function Feature({ title, page, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3"><a href={page}>{title}</a></Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
