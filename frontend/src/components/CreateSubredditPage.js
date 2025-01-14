import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Stack,
  FormControl,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { createLoadingAndErrorSelector } from '../selectors';
import { createSubreddit } from '../actions/subreddits';

class CreateSubredditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
    };
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, description } = this.state;
      const { createSubreddit, history } = this.props;
      const { name: subredditName } = await createSubreddit(name, description);
      history.push(`/r/${subredditName}`);
    } catch (e) {}
  };

  render() {
    const { name, description } = this.state;
    const { isLoading, error } = this.props;
    return (
      <Box w={['100%', '90%', '80%', '70%']} m="auto">
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={this.handleSubmit}>
          <Stack>
            <FormControl>
              <Input
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
                variant="filled"
                placeholder="subreddit name"
                isRequired
              />
            </FormControl>
            <FormControl>
              <Textarea
                value={description}
                onChange={(e) => this.setState({ description: e.target.value })}
                variant="filled"
                rows={5}
                placeholder="description (optional)"
              />
            </FormControl>
            <Button isLoading={isLoading} type="submit">
              create
            </Button>
          </Stack>
        </form>
      </Box>
    );
  }
}

const { loadingSelector, errorSelector } = createLoadingAndErrorSelector(
  ['CREATE_SUBREDDIT'],
  false
);

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  createSubreddit: (name, description) =>
    dispatch(createSubreddit(name, description)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateSubredditPage)
);
