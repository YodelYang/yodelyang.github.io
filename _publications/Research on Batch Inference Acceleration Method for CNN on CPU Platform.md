---
title: "BDLO: Batched-Data-Layout-Optimization for Enhanced CNN Batch Processing on CPUs" 
collection: publications
category: conferences
permalink: /publication/2024-05-01-bdlo-cnn-cpu-optimization
excerpt: "This research proposes a Batched-Data-Layout-Optimization (BDLO) method to enhance computational efficiency for batched convolutions in CNNs on CPU platforms, focusing on reducing reuse distances and minimizing memory accesses."
date: 2024-05-01
venue: 'NeurIPS 2024'
citation: 'Zhao, H., Liu, X., Chen, R., Tang, C., Wang, D., & Xie, J. (2024). "BDLO: Batched-Data-Layout-Optimization for Enhanced CNN Batch Processing on CPUs." <i>NeurIPS 2024</i>.'
---


## Paper Abstract

CPUs are the most widely used computing system, and deploying deep neural network algorithms on CPUs is one of the research focuses currently. Convolutions widely exist in deep neural networks and often become the performance bottlenecks in the inferences. Im2col-based convolution, a common convolution technique in deep learning frameworks, ignores large reuse distances when accessing weight data in batched scenarios, leading to unnecessary memory accesses. In this article, we propose a novel method on enhancing the computational efficiency of batched im2col-based convolutions by reducing reuse distances on CPUs. We propose a Batched-Data-Layout-Optimization (BDLO) method, which optimizes the data layouts of the batched input feature maps to eliminate the reuse distances of the weight data in batched im2col-based convolutions. Experimental results show that BDLO exhibits higher computational efficiency compared to the im2col-based convolution method implemented in the open-source deep learning framework LibTorch in batch processing. BDLO achieves about a 1.347X speedup for NCHW data layout and a 1.295X speedup for NHWC data layout. Additionally, it is found that the computational efficiency of data using the NHWC data layout is not always higher than that of the NCHW data layout on CPUs.

## Paper PDF


<iframe src="../files/Research on Batch Inference Acceleration Method for CNN on CPU Platform/IEEE_Journals_and_Transactions.pdf" width="100%" height="600px">
</iframe>


