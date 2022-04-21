Feature: Inspect created users with subscriptions

    Background:
        When I go to "https://viktor-silakov.github.io/course-sut/"
        When I login as: "walker@jw.com", "password"

    Scenario: <nameOfScenario>
        When I go to "Create User" menu item
        When I create user as: "<email>", "<password>", "<address1>", "<address2>", "<city>"
        Then I check created user as: "<email>", "<password>", "<address1>", "<address2>", "<city>"
        When I go to "Create Subscription" menu item
        When I create subscription as: "<email>", "<description>", "<years>", "<suspend>"
        Then I check created user's subscription as: "<email>", "<description>", "<years>", "<suspend>"
        When I log out
        Examples:
            | nameOfScenario                    | email         | password  | address1 | address2 | city  | description  | years | suspend |
            | Creation user 1 with subscription | user1@mail.ru | password1 | Street1  | Dom1     | City1 | Description1 | 1     | on      |
            | Creation user 2 with subscription | user2@mail.ru | password2 | Street2  |          | City2 |              | 2     |         |
            | Creation user 3 with subscription | user3@mail.ru | password3 |          | Dom3     |       |              |       | on      |

# npx wdio -f cucumber --spec features/creationUsersWithSubscriptionsAndInspectionThem.feature

