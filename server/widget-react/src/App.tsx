import { FC } from 'react';
import './App.css';
import Widget from './components/Widget/Widget';

interface Props {
  widgetId?: string;
}

const App: FC<Props> = ({ widgetId }) => {
  return (
    <>
      <Widget widgetId={widgetId} />
    </>
  );
};

export default App;
