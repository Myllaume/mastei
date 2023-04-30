import * as React from 'react';
import styles from './toolbar.module.css';
import { AppName } from './appname';
import { menuItem } from '../../types';
import cn from 'classnames';

interface ToolBarProps {
  template: menuItem[];
}

export function ToolBar({ template }: ToolBarProps) {
  function handleClick(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    onClick: (() => void) | undefined,
    disable: boolean | undefined
  ) {
    e.stopPropagation();
    if (disable || onClick === undefined) {
      return;
    }
    onClick();
  }

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
                  [styles.disabled]: firstDisable,
                })}
                onClick={(e) => handleClick(e, firstOnClick, firstDisable)}
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
                            [styles.disabled]: secondDisable,
                          })}
                          onClick={(e) => handleClick(e, secondOnClick, secondDisable)}
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
                                      [styles.disabled]: thirdDisable,
                                    })}
                                    onClick={(e) => handleClick(e, thirdOnClick, thirdDisable)}
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
