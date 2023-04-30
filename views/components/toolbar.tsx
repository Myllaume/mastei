import styles from './toolbar.module.css';
import { AppName } from './appname';
import { menuItem } from '../../types';
import cn from 'classnames';

interface ToolBarProps {
  template: menuItem[];
}

export function ToolBar({ template }: ToolBarProps) {
  return (
    <section className={styles.box}>
      <AppName />

      <nav>
        <ul className={styles.firstMenu}>
          {template.map(
            ({
              id: firstId,
              label: firstLabel,
              sub: firstSub,
              disable: firstDisable,
              onClick: firstOnClick,
            }) => (
              <li
                key={firstId}
                className={cn(styles.menuItem, styles.firstMenuItem, {
                  [styles.disabled]: firstDisable === true,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (firstDisable || firstOnClick === undefined) {
                    return;
                  }
                  firstOnClick();
                }}
              >
                {firstLabel}

                {firstSub && (
                  <ul className={styles.secondMenu}>
                    {firstSub.map(
                      ({
                        id: secondId,
                        label: secondLabel,
                        sub: secondSub,
                        disable: secondDisable,
                        onClick: secondOnClick,
                      }) => (
                        <li
                          key={secondId}
                          className={cn(styles.menuItem, styles.secondMenuItem, {
                            [styles.disabled]: secondDisable === true,
                          })}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (secondDisable || secondOnClick === undefined) {
                              return;
                            }
                            secondOnClick();
                          }}
                        >
                          {secondLabel}

                          {secondSub && (
                            <ul className={styles.thirdMenu}>
                              {secondSub.map(
                                ({
                                  id: thirdId,
                                  label: thirdLabel,
                                  disable: thirdDisable,
                                  onClick: thirdOnClick,
                                }) => (
                                  <li
                                    key={thirdId}
                                    className={cn(styles.menuItem, styles.thirdMenuItem, {
                                      [styles.disabled]: thirdDisable === true,
                                    })}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (thirdDisable || thirdOnClick === undefined) {
                                        return;
                                      }
                                      thirdOnClick();
                                    }}
                                  >
                                    {thirdLabel}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            )
          )}
        </ul>
      </nav>
    </section>
  );
}
