const Filter = ({ newValue, onChange }) => {
  return (
    <p>Filter shown with: <input value={newValue} onChange={onChange} /></p>
  )
}

export default Filter;