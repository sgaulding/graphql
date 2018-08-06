import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import "./App.css";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
      displayImage
    }
  }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogImage: ''
        };
    }

    onChangeImage(img) {
        this.setState({
            dogImage: img
        });
    }

  render() {
    const dogImage = this.state.dogImage;

    return (
      <Fragment>
        <h1>React Apollo Example</h1>
        <p>
          This app uses React-Apollo to call an example GraphQL endpoint that
          provides Dog data.
        </p>
        <Query query={GET_DOGS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return `Error: ${error.message}`;
            return (
              <form>
                <label>Dog Breed</label>
                <select name="dog" onChange={e => {this.onChangeImage(e.target.value)}}>
                  {data.dogs.map(dog => (
                    <option key={dog.id} value={dog.displayImage}>
                      {dog.breed}
                    </option>
                  ))}
                </select>
              </form>
            );
          }}
        </Query>
          <div>
            <img src={dogImage} alt='' />
          </div>
      </Fragment>
    );
  }
}

export default App;
