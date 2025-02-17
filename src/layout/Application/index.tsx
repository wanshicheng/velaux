import { Loading, Grid } from '@b-design/ui';
import React, { Component } from 'react';
import { connect } from 'dva';
import Header from './components/Header';
import EnvTabs from './components/EnvTabs';
import Menus from './components/Menus';
import './index.less';
import type { ApplicationDetail } from '../../interface/application';

const { Row } = Grid;

interface Props {
  match: any;
  dispatch: any;
  location: any;
  applicationDetail?: ApplicationDetail;
}
@connect((store: any) => {
  return { ...store.application };
})
class ApplicationLayout extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      activeName: '',
    };
  }

  componentDidMount() {
    this.onGetApplicationDetails();
    this.getNamespaceList();
  }

  shouldComponentUpdate(nextProps: any) {
    return nextProps.location !== this.props.location;
  }

  onGetApplicationDetails = async () => {
    const {
      params: { appName },
    } = this.props.match;
    this.setState({ activeName: appName, loading: true });
    this.props.dispatch({
      type: 'application/getApplicationDetail',
      payload: { appName: appName },
      callback: () => {
        this.setState({ loading: false }, () => {
          this.loadApplicationComponents();
          this.loadApplicationEnvbinding();
          this.loadApplicationWorkflows();
        });
      },
    });
  };

  getNamespaceList = async () => {
    this.props.dispatch({
      type: 'application/getNamespaceList',
      payload: {},
    });
  };

  loadApplicationEnvbinding = async () => {
    const {
      params: { appName },
    } = this.props.match;
    if (appName) {
      this.props.dispatch({
        type: 'application/getApplicationEnvbinding',
        payload: { appName: appName },
      });
    }
  };

  loadApplicationComponents = async () => {
    const {
      params: { appName },
    } = this.props.match;
    this.props.dispatch({
      type: 'application/getApplicationComponents',
      payload: { appName: appName },
    });
  };

  loadApplicationWorkflows = async () => {
    const {
      params: { appName },
    } = this.props.match;
    this.props.dispatch({
      type: 'application/getApplicationWorkflows',
      payload: { appName: appName },
    });
  };

  render() {
    const { loading, activeName } = this.state;
    const { children, dispatch, applicationDetail } = this.props;
    const {
      path,
      params: { appName, envName },
    } = this.props.match;
    const loadingDom = <Loading style={{ width: '100%', minHeight: '200px' }} />;
    if (activeName !== '' && appName != activeName) {
      this.onGetApplicationDetails();
      return loadingDom;
    }
    if (loading) {
      return loadingDom;
    }
    return (
      <div className="applayout">
        <Header appName={appName} currentPath={path} />
        <EnvTabs
          dispatch={dispatch}
          appName={appName}
          activeKey={envName ? envName : 'basisConfig'}
        />
        <Row className="padding16 main">
          <div className="menu">
            <Menus
              currentPath={path}
              applicationType={applicationDetail?.applicationType}
              appName={appName}
              envName={envName}
            />
          </div>
          <div className="content">{children}</div>
        </Row>
      </div>
    );
  }
}

export default ApplicationLayout;
