import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import FilterList from "./FilterList";
import {getCategories} from "../../utility/utility";

const items = getCategories();
const onChange = jest.fn();

it('Filter list renders correctly', () => {
    const view = render(
        <FilterList items={items} onChange={onChange} title="Filter Test" selectedItems={[]}/>,
    );

    expect(screen.getByText("Filter Test")).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(10);

    checkboxes.forEach((checkbox) => {
        expect(checkbox.checked).toBe(false);
    })

    items.forEach((item) => {
        expect(screen.getByText(item.value)).toBeInTheDocument()
    });
});

it('Filter list empty renders correctly', () => {
    const view = render(
        <FilterList items={[]} onChange={onChange} title="Filter Test" selectedItems={[]}/>,
    );

    expect(screen.getByText("Filter Test")).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});

it('Filter list renders pre selection correctly', () => {
    const selected = [];

    items.forEach((item, i) => {
        if (i % 2 === 0) {
            selected.push(item);
        }
    });

    const view = render(
        <FilterList items={items} onChange={onChange} title="Filter Test" selectedItems={selected}/>,
    );

    expect(screen.getByText("Filter Test")).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(10);

    checkboxes.forEach((checkbox, i) => {
        if (i % 2 === 0) {
            expect(checkbox.checked).toBe(true);
        } else {
            expect(checkbox.checked).toBe(false);
        }
    });
});

it('Filter list selection functionality', () => {
    const selected = [];

    items.forEach((item, i) => {
        if (i % 2 === 0) {
            selected.push(item);
        }
    });

    const view = render(
        <FilterList items={items} onChange={onChange} title="Filter Test" selectedItems={selected}/>,
    );

    expect(screen.getByText("Filter Test")).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(10);

    checkboxes.forEach((checkbox, i) => {
        const checked = checkbox.checked;
        if (i < 5) {
            checkbox.click();
            expect(checkbox.checked).toBe(!checked);
        }
    });
    expect(onChange).toBeCalledTimes(5);
});
