import React from 'react';
import Upload from './subcomponents/Upload';
import FilesViewer from './subcomponents/FilesViewer';
import NavBar from './subcomponents/NavBar';
import SortBar from './subcomponents/SortBar';
import Footer from './subcomponents/Footer';

import { fetchList } from '../../storage/utils.supabase.js';
import { supabase } from '../../storage/credentials.supabase.js';

//callback to search string uing filter method
function search(searchElement, searchString) {
  var searchInput = searchElement.toLowerCase().replace(/-/, " ")
  return searchInput.indexOf(searchString.toLowerCase()) != -1 || searchString.length == 0;
}

//function that will be passed to sort function to return correct value
function sortBy(a, b, value) {
  var aname = a.name.toLowerCase().split(".")[0]
  var bname = b.name.toLowerCase().split(".")[0]
  switch (value) {
    case "1":
      return aname.localeCompare(bname)
    case "2":
      return bname.localeCompare(aname)
    case "3":
      return new Date(a.updated_at) - new Date(b.updated_at)
    case "4":
      return new Date(b.updated_at) - new Date(a.updated_at)
  }
}

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      search: "",
      sort: 1,
    }
    this.dataBridge = this.dataBridge.bind(this)
  }

  componentDidMount() {
    this.refresh = setInterval(() => {
      fetchList().then(data => {
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              files: data
                .filter(file => search(file.name, this.state.search))
                .sort((a, b) => sortBy(a, b, this.state.sort))
            }
          )
        )
      })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  dataBridge(data) {
    this.setState(
      Object.assign(
        {},
        this.state,
        data
      )
    )
  }

  render() {
    if (supabase.auth.user() == null) {
      window.location.assign("/auth")
      return (
        <div></div>
      )
    } else {
      return (
        <main style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "flex-start" }}>
          <NavBar dataBridge={this.dataBridge} />

          <SortBar dataBridge={this.dataBridge} />

          <FilesViewer data={this.state.files} />

          <Upload />

          <Footer />
        </main >
      )
    }

  }
}



export default Files;