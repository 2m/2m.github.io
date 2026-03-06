import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Icon from "./mastodon.svg";

export default function ShareToMastodon({ metadata }) {

    const { siteConfig } = useDocusaurusContext();

    const shareLink =
        `https://share.joinmastodon.org/#text=` +
        `${siteConfig.url}${encodeURIComponent(metadata.permalink)}`;

    return (
        <div className={styles.mastodonButtonContainer}>
            <a href={shareLink} target="_blank" rel="noopener" className={styles.mastodonButton} aria-label="Share on Mastodon">
                Share on <Icon className={styles.mastodonLogo} />
            </a>
        </div>
    );
}
