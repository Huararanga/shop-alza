import css from './Categories.module.scss';

interface Props {
    title: string;
    categories?: string[];
}

function Categories({ title, categories }: Props) {
    if (!categories) {
        return null;
    }

    return (
        <div className={css.categories}>
            <h2 className={css.title}>{title}</h2>
            <div className={css.items}>
                {categories.map((category, index) => (
                    <span
                        className={css.item}
                        key={index}
                    >
                        <span>{category}</span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Categories;