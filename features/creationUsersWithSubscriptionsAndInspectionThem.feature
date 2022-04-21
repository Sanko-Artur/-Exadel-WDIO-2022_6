Feature: Inspect created users with subscriptions

    Background:
        When I go to "https://viktor-silakov.github.io/course-sut/"
        When I login as: "walker@jw.com", "password"

    Scenario: <nameOfScenario>
        When I go to "Create User" menu item
        When I create user as: "<email>", "<password>", "<address1>", "<address2>", "<city>"
        Then I check created user as: "<email>", "<password>", "<address1>", "<address2>", "<city>"
        When I go to "Create Subscription" menu item
        When I create subscription as: "<email>", "<subscriptions>"
        Then I check created user's subscription as: "<email>", "<subscriptions>"
        When I log out
        Examples:
            | nameOfScenario                    | email         | password  | address1 | address2 | city  | subscriptions |
            | Creation user 1 with subscription | user1@mail.ru | password1 | Street1  | Dom1     | City1 | subscription1 |
            | Creation user 2 with subscription | user2@mail.ru | password2 | Street2  | Dom2     | City2 | subscription2 |
            | Creation user 3 with subscription | user3@mail.ru | password3 | Street3  | Dom3     | City3 | subscription3 |

# npx wdio -f cucumber --spec features/creationUsersWithSubscriptionsAndInspectionThem.feature

