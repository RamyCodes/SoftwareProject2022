import styled from "styled-components";
import { categories }  from '../categData';
import CategoryItem from './CategoryItem';

const Container = styled.div`
    display: flex;
    padding: 60px;
    justify-content: space-between;
    background-color: green;
`;

const Categories = () => {
  return (
    <Container>
        {categories.map(item =>(
            <CategoryItem item ={item}/>
        ))}
    </Container>
  )
}

export default Categories