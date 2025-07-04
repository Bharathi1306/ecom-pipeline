pipeline {
    agent any

    environment {
        DOCKER_HUB = "bharathi136"
        IMAGE_NAME = "ecom-app"
        EKS_CLUSTER = "ecom-devops-cluster"
        AWS_REGION = "ap-southeast-1"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Bharathi1306/ecom-pipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_HUB}/${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                aws eks update-kubeconfig --region $AWS_REGION --name $EKS_CLUSTER
                kubectl apply -f k8s/deployment.yaml
                '''
            }
        }
    }
}
