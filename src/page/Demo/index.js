/*
 * @author: liuwengai
 * @date: 2019-03-19
 * @file: demo页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Button, message, Modal, Input, Divider,
} from 'antd';
import './style.less';

@inject(({ demo }) => ({
  getDemoList: demo.getDemoList,
  demoList: demo.demoList,
  updateDemo: demo.updateDemo,
  demoListLength: demo.demoListLength,
}))

@observer
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      projectName: '',
    };
  }

  componentDidMount() {
    const { getDemoList } = this.props;
    getDemoList();
  }

  updateList = () => {
    const { projectName } = this.state;
    const {
      updateDemo,
    } = this.props;
    updateDemo({
      project_name: projectName,
    });
    message.success('新建项目');
  }

  handleInputChange = (e) => {
    this.setState({
      projectName: e.target.value,
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }

  handleOk = () => {
    this.updateList();
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const {
      demoList, demoListLength,
    } = this.props;
    const { modalVisible, projectName } = this.state;
    return (
      <div className="demo">
        {
        modalVisible ? (
          <Modal
            title="新建项目"
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="项目名称" value={projectName} onChange={this.handleInputChange} />
          </Modal>
        ) : null
        }
        <h3>项目列表</h3>
        <div>
          {
          demoList && demoList.map(item => <p key={item.project_id}>{item.project_name}</p>)
        }
        </div>
        <p>
      项目的个数是：
          {demoListLength}
        </p>
        <Divider dashed />
        <Button type="primary" onClick={this.showModal}>新建项目</Button>
      </div>
    );
  }
}

Demo.propTypes = {
  demoList: PropTypes.instanceOf(Object),
  demoListLength: PropTypes.instanceOf(Object),
  getDemoList: PropTypes.func,
  updateDemo: PropTypes.func,
};

export default Demo;
