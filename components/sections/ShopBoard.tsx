'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cssVars } from '@/lib/style';

export interface BoardCategory {
  id: string;
  name: string;
  intro: string;
  cards: ReactNode[];
}

/**
 * The shop as a board: the categories are set very large and act as ARIA tabs (arrow keys follow the
 * reading direction); the chosen one shows its pieces. Without JavaScript every category is shown in turn.
 */
export function ShopBoard({ categories, tabsLabel }: { categories: BoardCategory[]; tabsLabel: string }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + categories.length) % categories.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    if (event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) select(active + 1);
    else if (event.key === (rtl ? 'ArrowRight' : 'ArrowLeft')) select(active - 1);
    else if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(categories.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="shop-board">
      <div role="tablist" aria-label={tabsLabel} className="shop-tabs">
        {categories.map((category, index) => (
          <button
            key={category.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${category.id}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${category.id}`}
            tabIndex={index === active ? 0 : -1}
            className="shop-tab"
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            <span>{category.name}</span>
            <sup className="num">{String(category.cards.length).padStart(2, '0')}</sup>
          </button>
        ))}
      </div>

      {categories.map((category, index) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${baseId}-panel-${category.id}`}
          aria-labelledby={`${baseId}-tab-${category.id}`}
          className="shop-panel"
          data-active={index === active}
        >
          <h3 className="shop-panel-title">{category.name}</h3>
          <p className="shop-intro">{category.intro}</p>
          <ul className="shop-grid">
            {category.cards.map((card, i) => (
              <li key={i} className="shop-cell" style={cssVars({ '--i': i })}>
                {card}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
