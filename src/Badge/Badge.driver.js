import {convertFromUxLangToCss} from '../Typography';
import styles from './Badge.st.css';

export default ({element}) => ({
  exists: () => !!element,
  isBadge: () => element.classList.contains(styles.badge),
  isOfType: type => element.classList.contains(styles[type]),
  isOfAppearance: appearance => element.classList.contains(styles[convertFromUxLangToCss(appearance)]),
  isOfAlignment: alignment => element.classList.contains(styles[alignment]),
  isOfShape: shape => element.classList.contains(styles[shape]),
  text: () => element.textContent
});
