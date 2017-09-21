import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="About" {...props}>
    <h1>ABOUT</h1>
  </DefaultCon>
));
