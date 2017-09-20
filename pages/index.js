// import PostList from '../components/PostList';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon {...props}>
    <h1>Home</h1>
  </DefaultCon>
));
