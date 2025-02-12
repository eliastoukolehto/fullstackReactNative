import { render, screen, within } from '@testing-library/react-native'
import { RepositoryListContainer } from "../../components/RepositoryList";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem')


      expect(within(repositoryItems[0]).getByText('jaredpalmer/formik')).toHaveTextContent('jaredpalmer/formik')
      expect(within(repositoryItems[1]).getByText('async-library/react-async')).toHaveTextContent('async-library/react-async')

      expect(within(repositoryItems[0]).getByText('Build forms in React, without the tears')).toHaveTextContent('Build forms in React, without the tears')
      expect(within(repositoryItems[1]).getByText('Flexible promise-based React data loader')).toHaveTextContent('Flexible promise-based React data loader')

      expect(within(repositoryItems[0]).getByText('TypeScript')).toHaveTextContent('TypeScript')
      expect(within(repositoryItems[1]).getByText('JavaScript')).toHaveTextContent('JavaScript')

      expect(within(repositoryItems[0]).getByText('1.6k')).toHaveTextContent('1.6k')
      expect(within(repositoryItems[1]).getByText('69')).toHaveTextContent('69')

      expect(within(repositoryItems[0]).getByText('22k')).toHaveTextContent('22k')
      expect(within(repositoryItems[1]).getByText('1.8k')).toHaveTextContent('1.8k')

      expect(within(repositoryItems[0]).getByText('88')).toHaveTextContent('88')
      expect(within(repositoryItems[1]).getByText('72')).toHaveTextContent('72')

      expect(within(repositoryItems[0]).getByText('3')).toHaveTextContent('3')
      expect(within(repositoryItems[1]).getByText('3')).toHaveTextContent('3')

    });
  });
});