import { useState } from 'react';
import cl from 'classnames';

import css from './Tabs.module.scss';

export interface Tab {
    title: string;
    content: React.ReactNode;
    active?: boolean;
}

interface Props {
    tabs: Tab[],
}
function Tabs({ tabs }: Props) {
    const [selectedIndex, setSelectedIndex] = useState((Math.max(tabs.findIndex((tab) => tab.active), 0)));

    return (
        <div className={css.tabs}>
            <div className={css.navs}>
                {tabs.map((tab, index) => {
                    return (
                        <span
                            className={cl(css.item, selectedIndex === index && css.itemActive)}
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <span>{tab.title}</span>
                        </span>
                    )
                })}
            </div>
            {tabs[selectedIndex].content}
        </div>
    )
}

export default Tabs;