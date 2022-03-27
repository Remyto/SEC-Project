# Posts&Comments Cloud Web Application

## A student work on Docker & Kubernetes

# Introduction

Our project is composed of a simple application that allows its users to upload posts and comment them. You can find our code on our Git.

While such application is simple by its design and its functionalities, we made our best to over-engineer it and made it complex enough to make it worth a cloud deployment.

## Launching the application

If you want to test the application yourself, know that it is running on port 3000 of a localhost and requires manual refresh (usage of the F5 key) to render changes.

## Apllication infrastructure

Our application is composed of multiple NodeJS projects that serve as microservices.

In order to deploy this application, we are going to use Docker and Kubernetes to deploy in Docker containers.

## Why use Docker?

Each Docker container can be seen as a sole single computing environment. Using Docker containers wrap the dependencies each program (service) requires. Here it is mainly Nodejs for example. Docker container will also be used to include some information on how to start up and run each program.

### Adding tags to containers

In order no to have to use the often very unhandy id of our containers, we can apply tag names to them for easier handling.

## Why use Kubernetes?

Kubernetes help run multiple containers together. Using some configurations files, we can tell Kubernetes to run our containers. It will then create these containers which run the programs for us and handle communication (that is network requests) between the services.

### Adding Pods for containers

Pods are great for group containers together so that they share resources and a specific way of execution. Plus, they help redeploy services when they go down unexpectedly.

The first pod we made was very simple; it only contains the post container.
We then went for something a little more professional and practical: a deployment. The goal wasn’t to do something big right away, but to do the same pod inside a deployment.

From our understanding, having such a deployment is useful for 2 reasons:

- It automatically recreates pods that crash.
- It allows to update all its pods easily.

### Node Port Service

Node Port services are used want we want to access a pod from outside the cluster it is in. It is mainly used for development purposes.

### Cluster IP Service

Cluster IP services are used anytime we want to setup a communication between different pods inside a same cluster. It sets a URL to access said pod.

It is currently useless, as there is only one pod. So, we made a second deployment for event-bus the same way we did for posts.

As to not have too many files, we created the Cluster IPs in the same files as the deployments.

Right now, the posts, comments and event-bus micro-services are connected through Cluster IP services.

The query micro-service service was not created because it is not finished and would return errors.

### Load Balancer Services

Load Balancer Services are the ‘right way’ to access a pod from outside its cluster.

Sadly we did not implement any load balancers because of a lack of time.
