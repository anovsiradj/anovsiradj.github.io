
"""
20190805211140~20190806003056
https://stackoverflow.com/a/4015104
https://gist.github.com/turicas/1510860
"""
class dick_001(dict):
	# def __init__(self,*args,**kwargs): super(dick_001, self).__init__(*args, **kwargs);
	# def __init__(self,*args,**kwargs): super().__init__(*args, **kwargs);

	def __missing__(self,k): return None;
	# def __getitem__(self,k): return self.get(k);
	# def __getattr__(self,k): return self.get(k);
	# def __getattr__(self,k): return super(dick_001, self).__getitem__(k);
	def __getattr__(self,k): return self.__getitem__(k);

	# def __setattr__(self,k,v): super(dick_001, self).__setitem__(k,v);
	def __setattr__(self,k,v): return self.__setitem__(k,v);

	# def __delitem__(self,k): return self.pop(k, None);
	def __delitem__(self,k):
		# if self.__contains__(k):
		if super().__contains__(k): return super().__delitem__(k);
		return None;

	# def __delattr__(self,k): super(dick_001, self).__delitem__(k);
	def __delattr__(self,k): return self.__delitem__(k);
# 

"""
"""
from types import SimpleNamespace
from collections import Mapping
class dick_002(SimpleNamespace):
	def __init__(self, *args, **kwargs):
		super(dick_002, self).__init__(**kwargs);
		# super(dick_002, self).__init__(*args, **kwargs)
		# if type(arg) is dict or isinstance(arg, dict):
		for arg in args: self.__dict__.update(arg);
		# self.__dict__.update(kwargs);
	# 

	def __getattr__(self, k):
		if self.__dict__.__contains__(k): return self.__dict__.__getitem__(k);
		else: return None;
	# 
	def __getitem__(self, k): return self.__getattr__(k);

	def __setitem__(self, k, v): self.__setattr__(k, v);

	def __delattr__(self, k):
		# if hasattr(super(), k): return super().__delattr__(k);
		if self.__dict__.__contains__(k): return self.__dict__.__delitem__(k);
		else: return None;
	# 
	def __delitem__(self, k): self.__delattr__(k);

	def __repr__(self): return repr(self.__dict__);

	def __eq__(self, against): return self.__dict__ == against;
# 
