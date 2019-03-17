<template>
  <div class="addads">
    <h1 class="title">Add new Ads</h1>
    <div class="row">
			<div class="col-md-3">

	            <div class="form-group">
	                <label for="description">ADS title</label>
	                <input class="form-control" placeholder="Enters the ads title" type="text" v-model="adsName">
	            </div>

	             

	            <button class="btn btn-primary" :disabled="disableSubmit" @click="performSubmit">Add new ADS</button>
                <strong v-show="submitting">Submitting...</strong>
                <strong v-show="errorSubmit" class="text-danger">Error occurred!</strong>

                <p v-show="successMessage" class="text-success">
                    <strong>Ads successfully added</strong>
                    <br>
                    You will be redirected to the ads page <strong>once the block will be mined!</strong>
                </p>
			</div>
		</div>
  </div>
</template>