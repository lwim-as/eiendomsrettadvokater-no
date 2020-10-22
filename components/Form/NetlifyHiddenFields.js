export function NetlifyHiddenFields({ items }) {
    return items.map(item => <input key={item.name} hidden readOnly name={item.name} value={item.value} />)
}